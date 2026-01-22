class SyncManager {
    constructor() {
        this.collection = "all4one_data";
        this.docId = "app_state_v1";
        this.unsubscribe = null;
        this.isSyncing = false;
    }

    // Push local state to Cloud
    async pushState(state) {
        if (!window.db) return;
        try {
            this.isSyncing = true;
            // Remove circular references or heavy transient UI state if needed
            // For now, we push the whole JSONable state
            await db.collection(this.collection).doc(this.docId).set(state);
            this.isSyncing = false;
            console.log("☁️ State synced to Cloud");
        } catch (e) {
            console.error("Sync Error:", e);
            this.isSyncing = false;
        }
    }

    // Listen for Cloud updates
    listenForUpdates(onUpdate) {
        if (!window.db) return;

        console.log("👂 Listening for cloud updates...");
        this.unsubscribe = db.collection(this.collection).doc(this.docId)
            .onSnapshot((doc) => {
                if (this.isSyncing) return; // Ignore our own updates (optimistic UI) - simplified logic

                if (doc.exists) {
                    const cloudData = doc.data();
                    console.log("☁️ Received update from Cloud");
                    onUpdate(cloudData);
                } else {
                    console.log("No cloud data found. Using local default.");
                    // Optional: Push local default to cloud if empty
                    // this.pushState(defaultState); 
                }
            });
    }
}

window.SyncManager = new SyncManager();

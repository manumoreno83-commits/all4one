import os

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.readlines()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(content)

base_dir = r"c:\Users\manum\.gemini\antigravity\scratch\fitness-app"
style_path = os.path.join(base_dir, "css", "style.css")
student_fix_path = os.path.join(base_dir, "student_fix.css")
fix_block_path = os.path.join(base_dir, "fix_block.css")

# Read original file
lines = read_file(style_path)

# Slicing logic
# Head: 0 to 1732 (inclusive, so :1732 index for 0-based list is lines 0..1731. Wait line 1732 is index 1731?)
# Step 193 output showed line 1731 as `}`, 1732 empty. 1733 corrupted.
# So we want up to index 1732 (which is line 1733 in editor).
# Python slice [:1732] gives indices 0 to 1731.
head = lines[:1732] 

# Corrupted part logic
# Tail: starts at 1974. Editor line 1974 is index 1973.
# So slice from [1973:]
tail = lines[1973:]

# Read fixes
student_fix = read_file(student_fix_path)
fix_block = read_file(fix_block_path)

# Stitch
new_content = head + student_fix + ["\n"] + fix_block + ["\n"] + tail

# Write output
output_path = os.path.join(base_dir, "css", "style_repaired.css")
write_file(output_path, new_content)

print(f"Stitched {len(new_content)} lines. Head: {len(head)}, Student: {len(student_fix)}, Fix: {len(fix_block)}, Tail: {len(tail)}")

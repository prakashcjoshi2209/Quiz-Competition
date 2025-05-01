import subprocess
import sys
import os

code = sys.argv[1]
with open("student_code.c", "w") as f:
    f.write(code)

compile_process = subprocess.run(["gcc", "student_code.c", "-o", "student_output"], capture_output=True, text=True)

if compile_process.returncode != 0:
    print(compile_process.stderr)
    sys.exit()

run_process = subprocess.run(["./student_output"], capture_output=True, text=True)
print(run_process.stdout)

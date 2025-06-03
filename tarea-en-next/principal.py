import subprocess

scripts = [
    "sacar_codigos.py",
    "sacar_inventario.py",
    "sacar_existencias.py",
    "guardar_excel.py"
]

for script in scripts:
    print(f"\n Ejecutando: {script}")
    resultado = subprocess.run(["python", script], capture_output=True, text=True)
    
    if resultado.returncode == 0:
        print(f" {script} ejecutado con éxito.")
        print(resultado.stdout)
    else:
        print(f" Error al ejecutar {script}")
        print(resultado.stderr)
        break  # Detiene si hay un error

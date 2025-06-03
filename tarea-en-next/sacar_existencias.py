# Nombres de los archivos
archivo_1 = "existencias_odoo.txt"
archivo_2 = "columna_f.txt"
archivo_salida = "resultado.txt"

# Leer los dos archivos como listas (línea por línea)
with open(archivo_1, "r", encoding="utf-8") as f1:
    lista_1 = [line.strip() for line in f1]

with open(archivo_2, "r", encoding="utf-8") as f2:
    lista_2 = [line.strip() for line in f2]

# Palabras que deben reemplazarse
palabras_objetivo = ["Full NO MOVER", "NO ENCONTRADO EN ODOO"]

# Construir la lista de salida
resultado = []
for i in range(len(lista_1)):
    valor = lista_1[i]
    if valor in palabras_objetivo:
        nuevo_valor = lista_2[i] if i < len(lista_2) else valor  # Evita IndexError
        resultado.append(nuevo_valor)
    else:
        resultado.append(valor)

# Guardar el resultado en un nuevo archivo
with open(archivo_salida, "w", encoding="utf-8") as f_out:
    for item in resultado:
        f_out.write(f"{item}\n")

print(f" Listo. Se generó el archivo: {archivo_salida}")

import os
import pandas as pd

# Buscar el primer archivo .xlsx que NO sea "base_codigos.xlsx"
def buscar_excel_en_carpeta():
    for archivo in os.listdir():
        if archivo.endswith(".xlsx") and archivo != "base_codigos.xlsx":
            return archivo
    return None

archivo_excel = buscar_excel_en_carpeta()
base_codigos_path = "base_codigos.xlsx"

if archivo_excel and os.path.exists(base_codigos_path):
    print(f" Archivo de datos: {archivo_excel}")
    print(f" Archivo base de códigos: {base_codigos_path}")

    # Cargar hoja "Publicaciones" del archivo principal
    xls = pd.ExcelFile(archivo_excel)
    df = pd.read_excel(xls, sheet_name="Publicaciones", header=None, skiprows=5)

    # Cargar base_codigos.xlsx
    base_df = pd.read_excel(base_codigos_path, header=None)

    # Crear diccionario de búsqueda {columna A: columna B}
    codigos_dict = dict(zip(base_df.iloc[:, 0], base_df.iloc[:, 1]))

    if df.shape[1] > 5:
        columna_d = df.iloc[:, 3]
        columna_f = df.iloc[:, 5]

        # Depuración: imprimir índice y contenido de columna D
        print("\n Depuración columna D (índice y valor):")
        for i, v in enumerate(columna_d):
            print(f"{i}: '{v}'")

        # Guardar columna_d.txt con sustituciones y repetición de último válido
        ultimo_valido = ""
        with open("columna_d.txt", "w", encoding="utf-8") as file_d:
            for valor in columna_d:
                if pd.isna(valor) or str(valor).strip() == "":
                    file_d.write(f"{ultimo_valido}\n")
                else:
                    sustituto = codigos_dict.get(valor)
                    if sustituto:
                        file_d.write(f"{sustituto}\n")
                        ultimo_valido = sustituto
                    else:
                        print(f" No se encontró: {valor} — favor de corregir el Excel base.")
                        file_d.write(f"{valor}\n")
                        ultimo_valido = valor  # También actualiza aunque no se haya encontrado

        # Guardar columna_f.txt (sin lógica de repetición, solo VACÍO)
        with open("columna_f.txt", "w", encoding="utf-8") as file_f:
            for valor in columna_f:
                if pd.isna(valor) or str(valor).strip() == "":
                    file_f.write("VACÍO\n")
                else:
                    file_f.write(f"{valor}\n")

        print("\n Archivos columna_d.txt y columna_f.txt generados con éxito.")
    else:
        print(" La hoja 'Publicaciones' no tiene suficientes columnas.")
else:
    print(" No se encontró el archivo base o el archivo de datos.")

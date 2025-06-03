import xmlrpc.client

# Configuración Odoo
url = 'https://firo.odoo.com'
db = 'firo'
username = 'desarrollo@firo.mx'
password = '0505'

# Autenticación
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
uid = common.authenticate(db, username, password, {})
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

print(f"[INFO] Conectado a Odoo con UID: {uid}")

# Leer códigos desde archivo
with open('columna_d.txt', 'r', encoding='utf-8') as f:
    codigos = [line.strip() for line in f if line.strip()]

# Buscar existencias
with open('existencias_odoo.txt', 'w', encoding='utf-8') as out:
    for code in codigos:
        if code == "F":
            out.write("Full NO MOVER\n")
            print("[INFO] Código omitido por ser Full")
            continue

        ids = models.execute_kw(db, uid, password,
            'product.product', 'search',
            [[['default_code', '=', code]]],
            {'limit': 1})

        if ids:
            qty = models.execute_kw(db, uid, password,
                'product.product', 'read',
                [ids], {'fields': ['qty_available']})[0]['qty_available']

            out.write(f"{qty}\n")
            print(f"[INFO] {code} -> {qty} en inventario")
        else:
            out.write("NO ENCONTRADO EN ODOO\n")
            print(f"[WARN] {code} no encontrado en Odoo")

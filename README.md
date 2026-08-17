# Ostéo Plerguer

Site React/Vite et API FastAPI pour le cabinet d'ostéopathie de Plerguer.

## Démarrer le frontend

```bash
cd frontend
npm install
npm run dev
```

## Démarrer l'API

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload
```

L'API expose `GET /api/health`.

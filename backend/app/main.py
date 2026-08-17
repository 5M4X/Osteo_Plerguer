from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from .config import load_settings

settings = load_settings()
app = FastAPI(title="Ostéo Plerguer API", version="0.1.0", docs_url="/docs" if settings.api_docs_enabled else None, redoc_url="/redoc" if settings.api_docs_enabled else None, openapi_url="/openapi.json" if settings.api_docs_enabled else None)

if settings.cors_origins or settings.cors_origin_regex:
    app.add_middleware(CORSMiddleware, allow_origins=list(settings.cors_origins), allow_origin_regex=settings.cors_origin_regex, allow_credentials=False, allow_methods=["GET"], allow_headers=["Accept", "Content-Type"])

app.add_middleware(TrustedHostMiddleware, allowed_hosts=list(settings.allowed_hosts), www_redirect=False)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Permissions-Policy"] = "camera=(), geolocation=(), microphone=()"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    if settings.is_production:
        response.headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'"
        response.headers["Strict-Transport-Security"] = "max-age=31536000"
    return response


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "message": "Bienvenue sur l'API Ostéo Plerguer."}

"""Configuration de l'API issue exclusivement des variables d'environnement."""

from dataclasses import dataclass
from os import getenv

LOCAL_DEVELOPMENT_ORIGIN = r"^https?://(localhost|127\.0\.0\.1):\d+$"
TRUE_VALUES = {"1", "true", "yes", "on"}
FALSE_VALUES = {"0", "false", "no", "off"}


def _boolean_setting(name: str, default: bool) -> bool:
    value = getenv(name)
    if value is None:
        return default
    normalized_value = value.strip().lower()
    if normalized_value in TRUE_VALUES:
        return True
    if normalized_value in FALSE_VALUES:
        return False
    raise ValueError(f"{name} doit être une valeur booléenne valide.")


def _list_setting(name: str, default: tuple[str, ...] = ()) -> tuple[str, ...]:
    value = getenv(name)
    if value is None:
        return default
    return tuple(item.strip() for item in value.split(",") if item.strip())


@dataclass(frozen=True, slots=True)
class Settings:
    environment: str
    allowed_hosts: tuple[str, ...]
    cors_origins: tuple[str, ...]
    cors_origin_regex: str | None
    api_docs_enabled: bool

    @property
    def is_production(self) -> bool:
        return self.environment == "production"


def load_settings() -> Settings:
    environment = getenv("OSTEO_ENVIRONMENT", "development").strip().lower()
    if environment not in {"development", "test", "production"}:
        raise ValueError("OSTEO_ENVIRONMENT doit valoir development, test ou production.")
    is_production = environment == "production"
    allowed_hosts = _list_setting("OSTEO_ALLOWED_HOSTS", () if is_production else ("localhost", "127.0.0.1", "testserver"))
    if is_production and not allowed_hosts:
        raise RuntimeError("OSTEO_ALLOWED_HOSTS doit être défini en production.")
    cors_origins = _list_setting("OSTEO_CORS_ORIGINS")
    return Settings(environment, allowed_hosts, cors_origins, None if is_production or cors_origins else LOCAL_DEVELOPMENT_ORIGIN, _boolean_setting("OSTEO_ENABLE_API_DOCS", not is_production))

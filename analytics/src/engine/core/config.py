import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    backend_url: str

    @classmethod
    def from_environment(cls) -> Settings:
        return cls(
            backend_url=os.getenv("STOCKHUB_BACKEND_URL", "http://localhost:8080")
        )

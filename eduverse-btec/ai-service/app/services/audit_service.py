from dataclasses import dataclass
from datetime import datetime


@dataclass
class AuditEvent:
    event: str
    actor: str
    status: str
    timestamp: str


class AuditService:
    def __init__(self) -> None:
        self.events: list[AuditEvent] = []

    def log(self, event: str, actor: str, status: str = 'ok') -> AuditEvent:
        payload = AuditEvent(
            event=event,
            actor=actor,
            status=status,
            timestamp=datetime.utcnow().isoformat() + 'Z'
        )
        self.events.append(payload)
        return payload

    def list_events(self, limit: int = 50) -> list[AuditEvent]:
        return self.events[-limit:]

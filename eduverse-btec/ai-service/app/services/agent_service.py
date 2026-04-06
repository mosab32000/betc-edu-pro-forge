from __future__ import annotations

from dataclasses import dataclass
from typing import Literal


AllowedAction = Literal['summarize', 'route_ticket', 'create_study_plan']


@dataclass
class AgentDecision:
    action: AllowedAction
    reason: str


class AutonomousAgent:
    def __init__(self) -> None:
        self.allowed_actions: set[str] = {'summarize', 'route_ticket', 'create_study_plan'}

    def decide(self, task: str) -> AgentDecision:
        text = task.lower()
        if 'plan' in text or 'خطة' in text:
            return AgentDecision(action='create_study_plan', reason='Task requests planning output.')
        if 'ticket' in text or 'incident' in text:
            return AgentDecision(action='route_ticket', reason='Task references operational incident.')
        return AgentDecision(action='summarize', reason='Default safe action for unknown tasks.')

    def execute(self, task: str) -> dict:
        decision = self.decide(task)
        if decision.action not in self.allowed_actions:
            raise PermissionError('Agent action blocked by policy')

        return {
            'status': 'completed',
            'action': decision.action,
            'reason': decision.reason,
            'result': f'Executed action {decision.action} for task: {task}'
        }

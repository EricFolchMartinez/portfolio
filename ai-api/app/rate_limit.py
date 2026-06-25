import threading
import time
from collections import defaultdict, deque
from datetime import date


class RateLimiter:
    """In-memory rate limiter: a per-IP sliding window plus a global daily cap.

    State is per-process (the service runs a single worker), which is the right
    trade-off for a small self-hosted portfolio: simple, dependency-free, and a
    restart simply resets the counters.
    """

    def __init__(self, per_ip_max: int, window_seconds: int, global_daily_max: int):
        self.per_ip_max = per_ip_max
        self.window_seconds = window_seconds
        self.global_daily_max = global_daily_max

        self._ip_hits: dict[str, deque[float]] = defaultdict(deque)
        self._global_count = 0
        self._global_day = date.today()
        self._lock = threading.Lock()

    def check(self, ip: str) -> tuple[bool, str]:
        """Return (allowed, reason). reason is "ip" or "global" when blocked."""
        now = time.time()
        with self._lock:
            # Reset the global counter at the start of a new day.
            today = date.today()
            if today != self._global_day:
                self._global_day = today
                self._global_count = 0
                self._ip_hits.clear()

            if self._global_count >= self.global_daily_max:
                return False, "global"

            hits = self._ip_hits[ip]
            cutoff = now - self.window_seconds
            while hits and hits[0] < cutoff:
                hits.popleft()

            if len(hits) >= self.per_ip_max:
                return False, "ip"

            hits.append(now)
            self._global_count += 1
            return True, ""

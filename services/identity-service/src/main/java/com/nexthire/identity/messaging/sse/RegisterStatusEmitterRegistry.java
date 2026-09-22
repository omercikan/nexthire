package com.nexthire.identity.messaging.sse;

import com.nexthire.identity.enums.Status;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RegisterStatusEmitterRegistry {

    private final Map<UUID, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter register(UUID identityId) {
        SseEmitter emitter = new SseEmitter(60_000L);

        emitter.onCompletion(() -> emitters.remove(identityId));
        emitter.onTimeout(() -> emitters.remove(identityId));
        emitter.onError((e) -> emitters.remove(identityId));

        emitters.put(identityId, emitter);

        return emitter;
    }

    public void notify(UUID identityId, Status status) {
        SseEmitter emitter = emitters.get(identityId);

        if (emitter == null) return;

        try {
            emitter.send(SseEmitter.event()
                    .name("register-status")
                    .data(status)
            );

            emitter.complete();

        } catch (Exception e) {
            emitters.remove(identityId);
        }
    }
}

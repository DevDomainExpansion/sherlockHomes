package com.sherlockhomes.game;

import com.sherlockhomes.game.dto.PurchaseRequest;
import com.sherlockhomes.game.dto.PurchaseResponse;
import com.sherlockhomes.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PurchaseService {

    private final GameService gameService;
    private final UserGameAccessRepository userGameAccessRepository;

    public PurchaseService(GameService gameService, UserGameAccessRepository userGameAccessRepository) {
        this.gameService = gameService;
        this.userGameAccessRepository = userGameAccessRepository;
    }

    @Transactional
    public PurchaseResponse initiatePurchase(User user, PurchaseRequest request) {
        Game game = gameService.getEntity(request.getGameId());

        if (game.isFree()) {
            throw new IllegalArgumentException("Game is free and does not require purchase");
        }

        boolean alreadyOwned = userGameAccessRepository.existsByUserAndGame(user, game);
        if (alreadyOwned) {
            return new PurchaseResponse("already_owned", null, game.getId());
        }

        UserGameAccess access = new UserGameAccess();
        access.setUser(user);
        access.setGame(game);
        access.setPurchased(true);
        userGameAccessRepository.save(access);

        String fakeOrderId = "order_" + UUID.randomUUID();
        return new PurchaseResponse("purchased", fakeOrderId, game.getId());
    }
}


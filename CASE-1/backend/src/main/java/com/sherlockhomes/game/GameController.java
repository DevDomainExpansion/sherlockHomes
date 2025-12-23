package com.sherlockhomes.game;

import com.sherlockhomes.game.dto.AccessResponse;
import com.sherlockhomes.game.dto.GameDto;
import com.sherlockhomes.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<List<GameDto>> listGames() {
        return ResponseEntity.ok(gameService.listGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGame(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.getGame(id));
    }

    @GetMapping("/{id}/access")
    public ResponseEntity<AccessResponse> hasAccess(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        boolean access = gameService.hasAccess(user, id);
        return ResponseEntity.ok(new AccessResponse(access));
    }
}


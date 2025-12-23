package com.sherlockhomes.game;

import com.sherlockhomes.game.dto.GameDto;
import com.sherlockhomes.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final UserGameAccessRepository userGameAccessRepository;

    public GameService(GameRepository gameRepository, UserGameAccessRepository userGameAccessRepository) {
        this.gameRepository = gameRepository;
        this.userGameAccessRepository = userGameAccessRepository;
    }

    public List<GameDto> listGames() {
        return gameRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public GameDto getGame(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
        return toDto(game);
    }

    public boolean hasAccess(User user, Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
        if (game.isFree()) {
            return true;
        }
        return userGameAccessRepository.existsByUserAndGame(user, game);
    }

    Game getEntity(Long id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
    }

    private GameDto toDto(Game game) {
        return new GameDto(
                game.getId(),
                game.getTitle(),
                game.getDescription(),
                game.getDifficulty(),
                game.getPrice(),
                game.isFree()
        );
    }
}


package com.sherlockhomes.game;

import com.sherlockhomes.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserGameAccessRepository extends JpaRepository<UserGameAccess, Long> {
    Optional<UserGameAccess> findByUserAndGame(User user, Game game);
    boolean existsByUserAndGame(User user, Game game);
}


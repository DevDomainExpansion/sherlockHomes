package com.sherlockhomes.game.dto;

import jakarta.validation.constraints.NotNull;

public class PurchaseRequest {
    @NotNull
    private Long gameId;

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }
}


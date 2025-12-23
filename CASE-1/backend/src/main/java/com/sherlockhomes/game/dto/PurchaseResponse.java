package com.sherlockhomes.game.dto;

public record PurchaseResponse(
        String status,
        String orderId,
        Long gameId
) {
}


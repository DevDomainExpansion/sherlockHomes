package com.sherlockhomes.game.dto;

import com.sherlockhomes.game.Difficulty;

import java.math.BigDecimal;

public record GameDto(
        Long id,
        String title,
        String description,
        Difficulty difficulty,
        BigDecimal price,
        boolean isFree
) {
}


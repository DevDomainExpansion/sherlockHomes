package com.sherlockhomes.game;

import com.sherlockhomes.game.dto.PurchaseRequest;
import com.sherlockhomes.game.dto.PurchaseResponse;
import com.sherlockhomes.user.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public ResponseEntity<PurchaseResponse> purchase(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PurchaseRequest request
    ) {
        return ResponseEntity.ok(purchaseService.initiatePurchase(user, request));
    }
}


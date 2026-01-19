package src.com.splitwose.service;

import src.com.splitwose.model.User;

public class SettlementService {

    private final BalanceService balanceService;

    public SettlementService(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    public void settle(User from, User to, double amount) {
        balanceService.addBalance(from, to, -amount);
    }
}

package src.com.splitwose.service;

import src.com.splitwose.model.User;

import java.util.HashMap;
import java.util.Map;

public class BalanceService {

    private final Map<User, Map<User, Double>> balances = new HashMap<>();

    public void addBalance(User from, User to, double amount) {
        balances
                .computeIfAbsent(from, k -> new HashMap<>())
                .put(to, balances.get(from).getOrDefault(to, 0.0) + amount);
    }

    public Map<User, Map<User, Double>> getBalances() {
        return balances;
    }
}

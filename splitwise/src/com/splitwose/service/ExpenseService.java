package src.com.splitwose.service;

import src.com.splitwose.model.Expense;
import src.com.splitwose.model.Group;
import src.com.splitwose.model.Split;
import src.com.splitwose.model.User;
import src.com.splitwose.split.SplitStrategy;

import java.util.List;
import java.util.UUID;

public class ExpenseService {

    private final BalanceService balanceService;

    public ExpenseService(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    
    public Expense addExpense(
            Group group,
            User paidBy,
            double totalAmount,
            List<User> users,
            List<Double> values,
            SplitStrategy splitStrategy
    ) {

        List<Split> splits = splitStrategy.calculateSplits(
                totalAmount,
                users,
                values
        );

        Expense expense = new Expense(
                UUID.randomUUID().toString(),
                paidBy,
                totalAmount,
                splits
        );

      
        for (Split split : splits) {
            User user = split.getUser();
            if (!user.equals(paidBy)) {
                balanceService.addBalance(
                        user,
                        paidBy,
                        split.getAmount()
                );
            }
        }

        group.addExpense(expense);

        return expense;
    }
}

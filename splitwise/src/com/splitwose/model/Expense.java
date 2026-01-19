package src.com.splitwose.model;

import java.util.List;

public class Expense {
    
    private final String expenseId;
    private final User paidBy;
    private final double totalAmount;
    private final List<Split> splits;

    public Expense(String expenseId, User paidBy, double totalAmount, List<Split> splits) {
        this.expenseId = expenseId;
        this.paidBy = paidBy;
        this.totalAmount = totalAmount;
        this.splits = splits;
    }

    public User getPaidBy() {
        return paidBy;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public List<Split> getSplits() {
        return splits;
    }
}

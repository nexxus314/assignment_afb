package src.com.splitwose;

import src.com.splitwose.model.*;
import src.com.splitwose.service.*;
import src.com.splitwose.split.*;

import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        BalanceService balanceService = new BalanceService();
        ExpenseService expenseService = new ExpenseService(balanceService);
        SettlementService settlementService = new SettlementService(balanceService);

        System.out.print("Enter group name: ");
        String groupName = scanner.nextLine();
        Group group = new Group("G1", groupName);

        System.out.print("Enter number of users: ");
        int userCount = scanner.nextInt();
        scanner.nextLine();

        List<User> users = new ArrayList<>();

        for (int i = 0; i < userCount; i++) {
            System.out.println("\nEnter details for user " + (i + 1));

            System.out.print("User ID: ");
            String id = scanner.nextLine();

            System.out.print("Name: ");
            String name = scanner.nextLine();

            System.out.print("Email: ");
            String email = scanner.nextLine();

            User user = new User(id, name, email);
            users.add(user);
            group.addMember(user);
        }

        System.out.print("\nEnter payer user ID: ");
        String payerId = scanner.nextLine();

        User paidBy = users.stream()
                .filter(u -> u.getUserId().equals(payerId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid payer"));

        System.out.print("Enter total expense amount: ");
        double amount = scanner.nextDouble();

        System.out.print("Choose split type (EQUAL / EXACT): ");
        String splitType = scanner.next().toUpperCase();

        SplitStrategy splitStrategy;
        List<Double> values = null;

        if (splitType.equals("EQUAL")) {
            splitStrategy = new EqualSplitStrategy();
        } else if (splitType.equals("EXACT")) {
            splitStrategy = new ExactSplitStrategy();
            values = new ArrayList<>();

            System.out.println("Enter exact amount for each user:");
            for (User user : users) {
                System.out.print(user.getName() + ": ");
                values.add(scanner.nextDouble());
            }
            double sum = values.stream().mapToDouble(Double::doubleValue).sum();

if (sum != amount) {
    throw new RuntimeException(
        "Exact split amounts do not sum up to total expense amount"
    );
}

        } else {
            throw new RuntimeException("Invalid split type");
        }

        expenseService.addExpense(
                group,
                paidBy,
                amount,
                users,
                values,
                splitStrategy
        );

        System.out.println("\n---- BALANCES ----");
        balanceService.getBalances().forEach((from, map) ->
                map.forEach((to, amt) ->
                        System.out.println(from.getName() + " owes " + to.getName() + " : " + amt)
                )
        );
    }
}

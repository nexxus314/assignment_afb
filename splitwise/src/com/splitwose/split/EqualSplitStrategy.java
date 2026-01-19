package src.com.splitwose.split;

import src.com.splitwose.model.Split;
import src.com.splitwose.model.User;

import java.util.ArrayList;
import java.util.List;

public class EqualSplitStrategy implements SplitStrategy {

    @Override
    public List<Split> calculateSplits(
            double totalAmount,
            List<User> users,
            List<Double> values
    ) {
        List<Split> splits = new ArrayList<>();
        double share = totalAmount / users.size();

        for (User user : users) {
            splits.add(new Split(user, share));
        }
        return splits;
    }
}

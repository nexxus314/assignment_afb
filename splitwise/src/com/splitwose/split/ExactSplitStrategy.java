package src.com.splitwose.split;

import src.com.splitwose.model.Split;
import src.com.splitwose.model.User;

import java.util.ArrayList;
import java.util.List;

public class ExactSplitStrategy implements SplitStrategy {

    @Override
    public List<Split> calculateSplits(
            double totalAmount,
            List<User> users,
            List<Double> values
    ) {
        List<Split> splits = new ArrayList<>();

        for (int i = 0; i < users.size(); i++) {
            splits.add(new Split(users.get(i), values.get(i)));
        }
        return splits;
    }
}

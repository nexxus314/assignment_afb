package src.com.splitwose.split;

import src.com.splitwose.model.Split;
import src.com.splitwose.model.User;

import java.util.List;

public interface SplitStrategy {

    List<Split> calculateSplits(
            double totalAmount,
            List<User> users,
            List<Double> values
    );
}

import { Text, Group, Paper, Divider, rem, Flex } from "@mantine/core";
import classes from "./Comment.module.css";

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

export default function Comment({ comment }) {
  return (
    <Paper withBorder radius="md" className={classes.comment} maw={rem(400)}>
      <Group>
        <div>
          <Text fz="sm">{comment.user.name}</Text>
          <Text fz="xs" c="dimmed">
            {formatDate(comment.date)}
          </Text>
        </div>
      </Group>
      <Divider my={rem(10)} />
      <Flex>
        <Text size="sm" className={classes.text}>
          {comment.text}
        </Text>
      </Flex>
    </Paper>
  );
}

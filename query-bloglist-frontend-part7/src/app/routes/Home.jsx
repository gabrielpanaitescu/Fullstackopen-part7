import { Title, Text, Stack } from "@mantine/core";

export default function Home() {
  return (
    <Stack>
      <Title order={1}>Home</Title>
      <Text>
        Welcome to our Blog App, a vibrant platform where users can share their
        favorite blogs by adding links for others to discover! Explore a diverse
        collection of blog names, complete with direct access to each post.
        Engage with the community by liking the blogs you love, fostering a
        collaborative environment where everyone can express their appreciation
        for great content. Join us to connect, share, and explore the world of
        blogging together!
      </Text>
    </Stack>
  );
}

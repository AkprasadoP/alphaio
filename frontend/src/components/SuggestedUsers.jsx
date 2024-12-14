import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";

const SuggestedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, [showToast]);

  return (
    <>
      <Text mb={4} fontWeight={"bold"} fontSize={["lg", "xl"]}>
        Suggested Users
      </Text>
      <Flex direction={"column"} gap={4}>
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {loading &&
          [0, 1, 2, 3, 4].map((_, idx) => (
            <Flex
              key={idx}
              gap={2}
              alignItems={"center"}
              p={["2", "4"]}
              borderRadius={"md"}
              flexDirection={["column", "row"]} // Stack items vertically on small screens
              textAlign={["center", "start"]}
            >
              {/* Avatar skeleton */}
              <Box>
                <SkeletonCircle size={["8", "10"]} />
              </Box>
              {/* Username and fullname skeleton */}
              <Flex
                w={"full"}
                flexDirection={"column"}
                gap={2}
                alignItems={["center", "flex-start"]}
              >
                <Skeleton h={"8px"} w={["60px", "80px"]} />
                <Skeleton h={"8px"} w={["70px", "90px"]} />
              </Flex>
              {/* Follow button skeleton */}
              <Flex justifyContent={["center", "flex-start"]}>
                <Skeleton h={"20px"} w={["50px", "60px"]} />
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default SuggestedUsers;

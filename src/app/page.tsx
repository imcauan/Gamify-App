import { CommentaryCard } from "@/components/cards/CommentaryCard";
import { CommentaryContent } from "@/components/cards/CommentaryCard/CommentaryContent";
import Screen from "@/components/common/Screen";

export default function Page() {
  return (
    <Screen>
      <p className="text-white">Hello Gamify!</p>
      <CommentaryCard.Root>
        <CommentaryCard.Image avatarUrl="" />
        <CommentaryContent 
          content="Lorem ipsum dolor sit dor amet"
          username="helixr6s"
        />
      </CommentaryCard.Root>
    </Screen>
  );
}

import { SOCIAL_LINKS } from "@/constants/socialLinks/socialLinks";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";

const SocialLinks: React.FC = () => (
  <Card className="bg-card text-card-foreground">
    <CardHeader>
      <CardTitle>Follow the Summer League</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2">
      {SOCIAL_LINKS.map(({ name, url, Icon }, i) => (
        <Link
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:border hover:rounded-full"
          aria-label={`Visit Summer League ${name}`}
        >
          <Icon size={20} />
        </Link>
      ))}
    </CardContent>
  </Card>
);

export default SocialLinks;

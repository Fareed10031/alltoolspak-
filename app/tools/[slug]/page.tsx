import { tools } from "@/data/tools";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id.toLowerCase().trim() }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const currentSlug = params?.slug ? params.slug.toLowerCase().trim() : '';
  const tool = tools.find((t) => t.id.toLowerCase().trim() === currentSlug);
  if (!tool) {
    return notFound();
  }
  const ToolComponent = tool.component;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{tool.name}</h1>
      <p className="mt-2 text-gray-500">{tool.description}</p>
      <div className="mt-8">
        <ToolComponent />
      </div>
    </div>
  );
}

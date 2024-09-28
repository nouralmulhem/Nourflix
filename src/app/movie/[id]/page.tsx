interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div>page movie {params.id}</div>;
}

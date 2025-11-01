interface AuthorCardProps {
  name: string;
  email: string;
}

export default function AuthorCard({ name, email }: AuthorCardProps) {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
          {name.charAt(0)}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">
          Agence de création de sites web à Bordeaux
        </p>
        <a
          href={`mailto:${email}`}
          className="text-primary hover:underline text-sm"
        >
          {email}
        </a>
      </div>
    </div>
  );
}


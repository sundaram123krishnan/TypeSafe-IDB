type User = {
  key: number;
  value: {
    id: number;
    email: string;
  };
};

type Profile = {
  key: number;
  value: {
    id: number;
    bio: string;
    userId: number;
  };
};

type Post = {
  key: number;
  value: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    published: boolean;
    authorId: number;
  };
};

type Category = {
  key: number;
  value: {
    id: number;
    name: string;
  };
};


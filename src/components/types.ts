// types.ts
export type Blog ={
    id: number;
    title: string;
    description: string;
    category: {
      id: number
      name: string
    }; // API still returns string for display
    author: {
      id:number
      name:string
      email:string
    }
    created_at:Date
  }
  
  export type BlogFormData ={
    title: string;
    description: string;
    category_id: number; // Form uses number for category IDs
  }
  
  export type BlogByAuthor = {
    id:string;
    title: string;
    description: string;
    category: {
      id:number;
      name:string;
    };
    created_at:Date // API expects number for category
  }
  
  export type BlogByAuthorResponse={
    message:string;
    results:{data:BlogByAuthor[];
    limit:number;
    page:number;
    total:number;
    totalPages:number

    }
  }
  export interface ApiResponse {
    message: string;
    success: boolean;
  }


export type AllBlogResponse={
  message:string;
  results:
  {
    data:Blog[]
  }
}


  //old code
//   // types.ts
// export interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   category: string; // API still returns string for display
//   authorId: string;
// }

// export interface BlogFormData {
//   title: string;
//   description: string;
//   category: number; // Form uses number for category IDs
// }

// export interface BlogApiData {
//   title: string;
//   content: string;
//   category: number; // API expects number for category
// }

// export interface ApiResponse {
//   message: string;
//   success: boolean;
// }
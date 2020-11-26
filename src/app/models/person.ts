export class Person {
  name?: string;
  last_name?: string;
  age?: number;
  image_url?: string;

  // method to handle if some field wasn't gotten
  static fromRawResponse = (res: Person[]) => {
    return res.map(item => {
      return {
        name: item.name ? item.name : '',
        last_name: item.last_name ? item.last_name : '',
        age: item.age ? item.age : 0,
        image_url: item.image_url ? item.image_url : '',
      };
    })
    ;
  }
}

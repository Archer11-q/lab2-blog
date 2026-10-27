// 训练2：ES6 七语法微练习（博客开发最常用的是展开与 map）
// 在浏览器控制台或 babeljs.io/repl 里跑这一段即可看到输出
// 1 箭头函数
const add = (a, b) => a + b;
console.log("1 箭头函数 add(1,2) =", add(1, 2));

// 2 解构：从 post 里解构出 title 与 category
const post = { id: 1, title: "第一篇", category: "技术" };
const { title, category } = post;
console.log("2 解构 title =", title, "category =", category);

// 3 展开：把 newPost 插到 posts 最前面，不改原数组
const posts = [{ id: 1 }, { id: 2 }];
const newPost = { id: 3 };
const newPosts = [newPost, ...posts];
console.log("3 展开 newPosts =", JSON.stringify(newPosts), "原数组未变 =", JSON.stringify(posts));

// 4 map：取出所有标题组成新数组
const titles = posts.map((p) => p.title);
console.log("4 map titles =", titles);

// 5 filter：过滤出分类为技术的文章
const techPosts = [post, { id: 2, title: "生活", category: "生活" }].filter((p) => p.category === "技术");
console.log("5 filter techPosts =", JSON.stringify(techPosts));

// 6 find：按 id 找到 id 为 2 的文章
const found = [post, { id: 2, title: "第二篇", category: "随笔" }].find((p) => p.id === 2);
console.log("6 find found =", JSON.stringify(found));

// 7 模板字符串：拼出 文章：第一篇，分类：技术
console.log(`7 模板字符串 文章：${title}，分类：${category}`);

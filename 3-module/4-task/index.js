function showSalary(users, age) {
  users = users.filter(user => user.age <= age)
  return users.map(user => `${user.name}, ${user.balance}`).join('\n')
}

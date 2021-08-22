
function statusChanger(status, toSomething){
    const statuses = {
        გროუერი: "grower",
        მწეველი: "smoker",
        მეწარმე: "owner",
        ქომაგი: "supporter",
        დამფუძნებელი: "founder",
        CBD: "cbd",
        ინვესტორი: "investor",
        ოქროს_ინვესტორი: "golden investor"
      }

    if(toSomething === 'class'){
        return statuses[status.replace(" ", "_")].replace(" ", "")
    } else if (toSomething === 'lang') {
        return statuses[status.replace(" ", "_")]
    } else {
        return status.replace('_', ' ')
    }
}

export default statusChanger
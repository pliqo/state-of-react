export default function avgRates(reviews) {
  let total = reviews.length;
  let sum = 0;
  if(reviews) {
    for(let i = 0;i<total;i++){
      sum += reviews[i].rate;
    }
  } else
    return 0;
  return (sum/total).toFixed(2);
}
export default function SimpleCircleSpinner({
  width = "w-10",
  height = "h-10",
}) {
  const style = `border-customBlue ${width} ${height} animate-spin rounded-full border-8 border-t-plum`;
  return <div className={style} />;
}

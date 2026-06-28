type ToastProps = {
  message: string;
  visible: boolean;
};

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div className={`toast ${visible ? "show" : ""}`} id="toast">
      <span className="toast-dot"></span>
      <span id="toast-msg">{message}</span>
    </div>
  );
}

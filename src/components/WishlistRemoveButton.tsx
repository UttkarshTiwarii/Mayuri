import { CloseIcon } from "./Icons";

type WishlistRemoveButtonProps = {
    onRemove: () => void;
};

export default function WishlistRemoveButton({ onRemove }: WishlistRemoveButtonProps) {
    return (
        <button
            type="button"
            className="wishlist-remove"
            onClick={(e) => {
                e.stopPropagation();
                onRemove();
            }}
            title="Remove from wishlist"
            aria-label="Remove from wishlist"
        >
            <CloseIcon style={{ width: 14, height: 14, stroke: "currentColor" }} />
            Remove
        </button>
    );
}


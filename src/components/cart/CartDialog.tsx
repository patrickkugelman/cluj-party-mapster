
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, X } from "lucide-react";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDialog = ({ open, onOpenChange }: CartDialogProps) => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout with items:", items);
  };

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.clubId} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <h4 className="font-medium">{item.clubName}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.price} RON × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.clubId, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.clubId, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeFromCart(item.clubId)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">{total} RON</span>
            </div>
            <Button className="w-full party-button" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;

import tkinter as tk

""" create a calculator using tkinter """


class Calculator(tk.Frame):
    """
    Calculator class
    """

    def __init__(self, master=None):
        """
        Initialize the calculator
        :param master: the root window
        """
        tk.Frame.__init__(self, master)
        self.grid()
        self.create_widgets()

    def create_widgets(self):
        """
        Create the widgets
        :return:
        """
        # create the display
        self.display = tk.Entry(self, width=33, bg="light green")
        self.display.grid(row=0, column=0, columnspan=4,
                          sticky=tk.N+tk.E+tk.S+tk.W)
        self.display.insert(0, "0")

        # create the buttons
        self.button_list = [
            "7", "8", "9", "+",
            "4", "5", "6", "-",
            "1", "2", "3", "*",
            "0", ".", "=", "/",
            "C", "->", "<-"
        ]
        for i in range(len(self.button_list)):
            button = tk.Button(self, text=self.button_list[i], width=5, height=3, bg="light blue",
                               command=lambda x=i: self.click(x))
            button.grid(row=i+1, column=0, sticky=tk.N+tk.E+tk.S+tk.W)

        # create the buttons
        self.button_list = [
            "7", "8", "9", "+",
            "4", "5", "6", "-",
            "1", "2", "3", "*",
            "0", ".", "=", "/",
            "C", "->", "<-"
        ]
        for i in range(len(self.button_list)):
            button = tk.Button(self, text=self.button_list[i], width=5, height=3, bg="light blue",
                               command=lambda x=i: self.click(x))
            button.grid(row=i+1, column=1, sticky=tk.N+tk.E+tk.S+tk.W)
        # create the buttons
        self.button_list = [
            "7", "8", "9", "+",
            "4", "5", "6", "-",
            "1", "2", "3", "*",
            "0", ".", "=", "/",
            "C", "->", "<-"
        ]
        for i in range(len(self.button_list)):
            button = tk.Button(self, text=self.button_list[i], width=5, height=3, bg="light blue",
                               command=lambda x=i: self.click(x))
            button.grid(row=i+1, column=2, sticky=tk.N+tk.E+tk.S+tk.W)

    def click(self, i):
        """
        Click a button
        :param i: the button index
        :return:
        """
        if i == 0:
            self.display.insert(tk.END, "7")
        elif i == 1:
            self.display.insert(tk.END, "8")
        elif i == 2:
            self.display.insert(tk.END, "9")
        elif i == 3:
            self.display.insert(tk.END, "+")
        elif i == 4:
            self.display.insert(tk.END, "4")
        elif i == 5:
            self.display.insert(tk.END, "5")
        elif i == 6:
            self.display.insert(tk.END, "6")
        elif i == 7:
            self.display.insert(tk.END, "-")
        elif i == 8:
            self.display.insert(tk.END, "1")
        elif i == 9:
            self.display.insert(tk.END, "2")
        elif i == 10:
            self.display.insert(tk.END, "3")
        elif i == 11:
            self.display.insert(tk.END, "*")
        elif i == 12:
            self.display.insert(tk.END, "0")
        elif i == 13:
            self.display.insert(tk.END, ".")
        elif i == 14:
            self.display.insert(tk.END, "=")
        elif i == 15:
            self.display.insert(tk.END, "/")
        elif i == 16:
            self.display.insert(tk.END, "C")
        elif i == 17:
            self.display.insert(tk.END, "->")
        elif i == 18:
            self.display.insert(tk.END, "<-")
        else:
            print("invalid index")

    def get_value(self):
        """
        Get the value of the display
        :return: the value
        """
        return self.display.get()

    def set_value(self, value):
        """
        Set the value of the display
        :param value: the value
        :return:
        """
        self.display.delete(0, tk.END)
        self.display.insert(0, value)

    def clear(self):
        """
        Clear the display
        :return:
        """
        self.display.delete(0, tk.END)
        self.display.insert(0, "0")


if __name__ == "__main__":
    root = tk.Tk()
    app = Calculator(master=root)
    app.mainloop()

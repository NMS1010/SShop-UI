const CheckBox = ({ className, label, onClick }) => {
    return (
        <div className="ml-8">
            <input type="checkbox" name="checkbox-two" id="checkbox-two" className={className} onClick={onClick} />
            <label for="checkbox-two" class="ml-3 text-2xl">
                {label}
            </label>
        </div>
    );
};
export default CheckBox;

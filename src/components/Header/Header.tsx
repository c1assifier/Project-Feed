import ThemeButton from '../ThemeSwitcher/ThemeButton';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import { MdRssFeed } from "react-icons/md";
import { TbSearch } from "react-icons/tb";

interface HeaderProps {
    onSearch: (value: string) => void;
    resetSearch: () => void; // Новый пропс для сброса
}

export const Header = ({ onSearch, resetSearch }: HeaderProps) => {
    const myName = "Artem's Feed";
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.trim()) {
            onSearch(value);
        }
    };

    const handleClearText = () => {
        setSearchTerm("");
        resetSearch(); // Очищаем также через пропс, если это требуется
    };

    return (
        <header>
            <MdRssFeed className="icon" />
            <p className='name'>{myName}</p>
            <ThemeButton />
            {location.pathname === '/' && (
                <div className="search-container">
                    <TbSearch className="search-icon" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleClearText}
                        placeholder="Search by title"
                        className="search-input"
                    />
                </div>
            )}
        </header>
    );
};

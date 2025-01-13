import React from 'react';

const SizeGuide = () => {
  return (
    <div className="size-guide">
      <h2>Size Guide</h2>
      <p>Please use the following chart as a guide to determine your size.</p>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Bust (in)</th>
            <th>Waist (in)</th>
            <th>Hips (in)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XS</td>
            <td>31-32</td>
            <td>24-25</td>
            <td>34-35</td>
          </tr>
          <tr>
            <td>S</td>
            <td>33-34</td>
            <td>26-27</td>
            <td>36-37</td>
          </tr>
          <tr>
            <td>M</td>
            <td>35-36</td>
            <td>28-29</td>
            <td>38-39</td>
          </tr>
          <tr>
            <td>L</td>
            <td>37-39</td>
            <td>30-32</td>
            <td>40-42</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>40-42</td>
            <td>33-35</td>
            <td>43-45</td>
          </tr>
          <tr>
            <td>XXL</td>
            <td>43-45</td>
            <td>36-38</td>
            <td>46-48</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SizeGuide;
